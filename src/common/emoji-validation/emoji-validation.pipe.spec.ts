import { BadRequestException } from '@nestjs/common';
import { EmojiValidationPipe } from './emoji-validation.pipe';

describe('EmojiValidationPipe', () => {
  const emojiPipe = new EmojiValidationPipe();
  it('should be defined', () => {
    expect(emojiPipe).toBeDefined();
  });

  it('should return undefined if no value is passed in', () => {
    expect(emojiPipe.transform(undefined)).toBeUndefined();
  });

  it('should throw a BadRequest Error if the value is not a number', () => {
    expect(() => emojiPipe.transform('Hello')).toThrow(BadRequestException);
  });

  it('should throw a BadRequest Error if the value is less than 0', () => {
    expect(() => emojiPipe.transform(-1)).toThrow(BadRequestException);
  });

  it('should throw a BadRequest Error if the value is greater than 10', () => {
    expect(() => emojiPipe.transform(11)).toThrow(BadRequestException);
  });

  it('should return the respective value', () => {
    expect(emojiPipe.transform('5')).toBe(5);
  });
});
