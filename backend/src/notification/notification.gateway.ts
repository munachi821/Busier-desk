// src/notification/notification.gateway.ts

import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  import { Logger } from '@nestjs/common';
  
  @WebSocketGateway({
    cors: {
      origin: process.env.FRONTEND_URL ?? '*',
      credentials: true,
    },
    namespace: '/notifications',
  })
  export class NotificationGateway
    implements OnGatewayConnection, OnGatewayDisconnect
  {
    @WebSocketServer()
    server: Server;
  
    private readonly logger = new Logger(NotificationGateway.name);
  
    // Map userId → Set of socket IDs (one user can have multiple tabs open)
    private userSockets = new Map<string, Set<string>>();
  
    handleConnection(client: Socket) {
      // The frontend must send: socket.emit('register', { userId })
      this.logger.log(`Client connected: ${client.id}`);
    }
  
    handleDisconnect(client: Socket) {
      this.logger.log(`Client disconnected: ${client.id}`);
      this.removeSocket(client.id);
    }
  
    /**
     * Frontend registers its userId after connecting:
     *   socket.emit('register', { userId: 'user_abc123' })
     */
    @SubscribeMessage('register')
    handleRegister(
      @MessageBody() data: { userId: string },
      @ConnectedSocket() client: Socket,
    ) {
      const { userId } = data;
      if (!userId) return;
  
      if (!this.userSockets.has(userId)) {
        this.userSockets.set(userId, new Set());
      }
      this.userSockets.get(userId)!.add(client.id);
  
      // Join a room named after the userId for easy broadcasting
      client.join(`user:${userId}`);
      this.logger.log(`User ${userId} registered on socket ${client.id}`);
    }
  
    /**
     * Called by NotificationService to push a notification to a specific user.
     * All tabs/devices that user has open will receive it.
     */
    sendToUser(userId: string, payload: object) {
      this.server.to(`user:${userId}`).emit('notification', payload);
    }
  
    // ─── Helpers ────────────────────────────────────────────────────────────────
  
    private removeSocket(socketId: string) {
      for (const [userId, sockets] of this.userSockets.entries()) {
        if (sockets.has(socketId)) {
          sockets.delete(socketId);
          if (sockets.size === 0) {
            this.userSockets.delete(userId);
          }
          break;
        }
      }
    }
  }