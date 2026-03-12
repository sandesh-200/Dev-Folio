"use client";

import { Twitter, Linkedin, Facebook, Mail } from "lucide-react";

interface SharePostProps {
  title: string;
  url: string;
}

export function SharePost({ title, url }: SharePostProps) {
  const encodedTitle = encodeURIComponent(title);
  const encodedURL = encodeURIComponent(url);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Twitter */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedURL}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition-colors"
        title="Share on Twitter"
      >
        <Twitter size={20} />
      </a>

      {/* LinkedIn */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedURL}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-700 text-white shadow-lg hover:bg-blue-800 transition-colors"
        title="Share on LinkedIn"
      >
        <Linkedin size={20} />
      </a>

      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-800 text-white shadow-lg hover:bg-blue-900 transition-colors"
        title="Share on Facebook"
      >
        <Facebook size={20} />
      </a>

      {/* Email */}
      <a
        href={`mailto:?subject=${encodedTitle}&body=${encodedURL}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-700 text-white shadow-lg hover:bg-gray-800 transition-colors"
        title="Share via Email"
      >
        <Mail size={20} />
      </a>
    </div>
  );
}