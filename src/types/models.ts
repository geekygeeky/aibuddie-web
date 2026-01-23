export type AiBuddy = {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  systemPrompt: string;
  modelTier: string;
  isActive: boolean;
  isPublic: boolean;
  usageCount: number;
  createdAt: Date;
};

export type Conversation = {
  title: string;
  updatedAt: Date;
  createdAt: Date;
};
