interface Artist {
  id: string;
  name: string;
  realName: string | null;
  birthDate: string | null;
  description: string | null;
  nationality: string | null;
  biography: string | null;
  thumbnail: string | null;
  backgroundImg: string | null;
  isVerified: boolean;
  isPublic: boolean;
}

export type { Artist };
