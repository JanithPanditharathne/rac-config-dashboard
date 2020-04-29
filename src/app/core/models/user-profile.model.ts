import { UserPermissionLevel } from '../enums';

export interface UserProfile {
  userId: string;
  userGroup: string;
  userGroupId: UserPermissionLevel;
}
