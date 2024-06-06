interface Artist {
  id: string;
  urn: string;
  name: string;
  isVerified: boolean;
  isPublic: boolean;
  realName: string | null;
  birthDate: string | null;
  description: string | null;
  nationality: string | null;
  biography: string | null;
  thumbnail: string | null;
  background: string | null;
  totalLikes: number;
}

export type { Artist };
