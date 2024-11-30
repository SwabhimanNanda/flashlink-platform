// FlashCard model
import mongoose from 'mongoose';

const SocialLinkSchema = new mongoose.Schema({
  platform: String,
  link: String,
});

const CardsDetailsSchema = new mongoose.Schema({
  gradient: String,
  textColor: String,
  borderColor: String,
  avatarBorder: String,
  linksStyle: String
});

const FlashCardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    username: String,
    socialLinks: [SocialLinkSchema],
    cardsDetails:[CardsDetailsSchema]
  },
  { timestamps: true }
);

export default mongoose.models.FlashCard || mongoose.model('FlashCard', FlashCardSchema);