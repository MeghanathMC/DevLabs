import Joi from 'joi';

export const validateRegister = (data: any) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required()
  });

  return schema.validate(data);
};

export const validateLogin = (data: any) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });

  return schema.validate(data);
};

export const validateProject = (data: any) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    shortDescription: Joi.string().max(200).required(),
    description: Joi.string().min(10).required(),
    technologies: Joi.array().items(Joi.string()).min(1).required(),
    category: Joi.string().valid('web', 'mobile', 'ai', 'blockchain', 'iot', 'game', 'other').required(),
    status: Joi.string().valid('completed', 'ongoing', 'abandoned').default('completed'),
    images: Joi.array().items(Joi.string().uri()),
    videos: Joi.array().items(Joi.string().uri()),
    links: Joi.object({
      github: Joi.string().uri(),
      demo: Joi.string().uri(),
      devpost: Joi.string().uri(),
      youtube: Joi.string().uri(),
      slides: Joi.string().uri()
    }),
    hackathon: Joi.object({
      name: Joi.string().required(),
      date: Joi.date().required(),
      location: Joi.string().required(),
      duration: Joi.string(),
      organizer: Joi.string(),
      website: Joi.string().uri()
    }),
    team: Joi.array().items(Joi.object({
      name: Joi.string().required(),
      role: Joi.string().required(),
      github: Joi.string().uri(),
      linkedin: Joi.string().uri()
    })),
    achievements: Joi.array().items(Joi.string()),
    tags: Joi.array().items(Joi.string()),
    featured: Joi.boolean().default(false)
  });

  return schema.validate(data);
};

export const validateAchievement = (data: any) => {
  const schema = Joi.object({
    type: Joi.string().valid('certificate', 'award', 'participation', 'recognition', 'scholarship').required(),
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string(),
    issuer: Joi.string().required(),
    date: Joi.date().required(),
    expiryDate: Joi.date(),
    certificateUrl: Joi.string().uri(),
    verificationUrl: Joi.string().uri(),
    badgeUrl: Joi.string().uri(),
    category: Joi.string().required(),
    level: Joi.string().valid('beginner', 'intermediate', 'advanced', 'expert').required(),
    featured: Joi.boolean().default(false),
    skills: Joi.array().items(Joi.string()),
    projectId: Joi.string()
  });

  return schema.validate(data);
};

export const validateUserProfile = (data: any) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    bio: Joi.string().max(500),
    location: Joi.string().max(100),
    university: Joi.string().max(100),
    graduationYear: Joi.number().integer().min(1900).max(new Date().getFullYear() + 10),
    skills: Joi.array().items(Joi.string().trim()),
    socialLinks: Joi.object({
      github: Joi.string().uri(),
      linkedin: Joi.string().uri(),
      portfolio: Joi.string().uri(),
      twitter: Joi.string().uri()
    })
  });

  return schema.validate(data);
};

export const validateUserSettings = (data: any) => {
  const schema = Joi.object({
    portfolioSlug: Joi.string().min(3).max(50).pattern(/^[a-z0-9-]+$/),
    isPublic: Joi.boolean(),
    theme: Joi.string().valid('modern', 'professional', 'creative', 'minimal'),
    customization: Joi.object({
      primaryColor: Joi.string().pattern(/^#[0-9A-F]{6}$/i),
      secondaryColor: Joi.string().pattern(/^#[0-9A-F]{6}$/i),
      font: Joi.string(),
      showSection: Joi.object({
        about: Joi.boolean(),
        projects: Joi.boolean(),
        achievements: Joi.boolean(),
        skills: Joi.boolean(),
        contact: Joi.boolean()
      })
    })
  });

  return schema.validate(data);
};

export const validatePortfolioSettings = (data: any) => {
  const schema = Joi.object({
    portfolioSlug: Joi.string().min(3).max(50).pattern(/^[a-z0-9-]+$/).required(),
    isPublic: Joi.boolean().required(),
    theme: Joi.string().valid('modern', 'professional', 'creative', 'minimal').required(),
    customization: Joi.object({
      primaryColor: Joi.string().pattern(/^#[0-9A-F]{6}$/i).required(),
      secondaryColor: Joi.string().pattern(/^#[0-9A-F]{6}$/i).required(),
      font: Joi.string().required(),
      showSection: Joi.object({
        about: Joi.boolean().required(),
        projects: Joi.boolean().required(),
        achievements: Joi.boolean().required(),
        skills: Joi.boolean().required(),
        contact: Joi.boolean().required()
      }).required()
    }).required()
  });

  return schema.validate(data);
};