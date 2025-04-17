import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getEmoji(index?: number): string {
    const emojis = ['😀', '😂', '😍', '🥳', '😎', '🤔', '🙃', '😴', '🤩', '😇','😉'];
    const emojiIndex = index ?? Math.floor(emojis.length * Math.random());
    return emojis[emojiIndex];
  }
}
