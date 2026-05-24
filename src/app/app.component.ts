import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeminiService } from './gemini.service'; // Conecta con el servicio de arriba

interface Message {
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule], // Habilita las directivas y formularios en el HTML
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'IA';
  userInput: string = '';
  isLoading: boolean = false;
  
  messages: Message[] = [
    { 
      sender: 'bot', 
      text: '¡Hola! Soy tu asistente de IA. ¿En qué te puedo colaborar hoy?', 
      timestamp: new Date() 
    }
  ];

  constructor(private geminiService: GeminiService) {}

  async send() {
    if (!this.userInput.trim() || this.isLoading) return;

    const userMessage = this.userInput.trim();
    this.userInput = ''; 

    // Añade el mensaje del usuario a la pantalla
    this.messages.push({
      sender: 'user',
      text: userMessage,
      timestamp: new Date()
    });

    this.isLoading = true;

    try {
      // Envía el texto al servicio de Gemini
      const botResponse = await this.geminiService.sendMessage(userMessage);

      // Añade la respuesta de Gemini a la pantalla
      this.messages.push({
        sender: 'bot',
        text: botResponse,
        timestamp: new Date()
      });
    } catch (error) {
      console.error('Error con Gemini:', error);
      this.messages.push({
        sender: 'bot',
        text: 'Ocurrió un error al procesar el mensaje. Inténtalo de nuevo.',
        timestamp: new Date()
      });
    } finally {
      this.isLoading = false;
    }
  }
}