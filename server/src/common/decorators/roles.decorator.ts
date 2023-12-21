import { SetMetadata } from "@nestjs/common";
import { UserRole } from "@prisma/client";



export const ROLES_METADATA_KEY = 'roles';

export const Roles = (roles: UserRole[]) => {
  return SetMetadata(ROLES_METADATA_KEY, Array.from(new Set(roles)));
};

