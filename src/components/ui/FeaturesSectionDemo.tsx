import { cn } from "../../lib/utils";
import {
  RocketLaunchIcon,
  TrophyIcon,
  DocumentIcon,
  ChartBarIcon,
  ShareIcon,
  StarIcon
} from '@heroicons/react/24/outline';

export default function FeaturesSectionDemo() {
  const features = [
    {
      title: "Project Showcase",
      description:
        "Display your hackathon projects with rich media, tech stacks, and detailed descriptions.",
      icon: <RocketLaunchIcon className="h-6 w-6" />,
    },
    {
      title: "Achievement Tracking",
      description:
        "Keep track of awards, certificates, and recognitions from hackathons and competitions.",
      icon: <TrophyIcon className="h-6 w-6" />,
    },
    {
      title: "Professional Portfolios",
      description:
        "Generate beautiful, customizable portfolios that showcase your work professionally.",
      icon: <DocumentIcon className="h-6 w-6" />,
    },
    {
      title: "Analytics Dashboard",
      description: "Track your growth, portfolio views, and identify your most popular projects.",
      icon: <ChartBarIcon className="h-6 w-6" />,
    },
    {
      title: "Easy Sharing",
      description: "Share your portfolio with custom URLs and export to PDF for applications.",
      icon: <ShareIcon className="h-6 w-6" />,
    },
    {
      title: "Standout Design",
      description:
        "Multiple professional templates designed to make your work stand out.",
      icon: <StarIcon className="h-6 w-6" />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature border-primary-500/20",
        "flex flex-col lg:border-r py-10 relative group/feature border-indigo-500/20",
        (index === 0 || index === 3) && "lg:border-l border-primary-500/20",
        (index === 0 || index === 3) && "lg:border-l border-indigo-500/20",
        index < 3 && "lg:border-b border-indigo-500/20"
      )}
    >
      {index < 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-bg-tertiary to-transparent pointer-events-none" />
      )}
      {index >= 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-bg-tertiary to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-primary-400">
      <div className="mb-4 relative z-10 px-10 text-indigo-400">
        {icon}
      </div>
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-indigo-500/30 group-hover/feature:bg-indigo-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-text-primary">
          {title}
        </span>
      </div>
      <p className="text-sm text-text-secondary max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};