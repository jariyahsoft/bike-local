import type { UserId } from "../../shared/domain/index.js";
import type {
  DomainUserResolver,
  ResolvedDomainUser,
  RoleAssignmentLookup,
} from "../application/security-pipeline.js";
import type {
  AuthIdentityRepository,
  UserRepository,
} from "../domain/identity-repository.js";
import type { RoleAssignment } from "../domain/rbac.js";

export class RepositoryDomainUserResolver implements DomainUserResolver {
  constructor(
    private readonly authIdentityRepository: AuthIdentityRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async resolveByFirebaseUid(
    firebaseUid: string,
  ): Promise<ResolvedDomainUser | null> {
    const authIdentity =
      await this.authIdentityRepository.findByFirebaseUid(firebaseUid);
    if (authIdentity === null) {
      return null;
    }

    const user = await this.userRepository.findById(authIdentity.userId);
    if (user === null) {
      return null;
    }

    return {
      userId: user.id,
      tenantId: user.tenantId,
      status: user.status,
    };
  }
}

export class RepositoryRoleAssignmentLookup implements RoleAssignmentLookup {
  constructor(private readonly userRepository: UserRepository) {}

  async listRoleAssignments(
    userId: UserId,
  ): Promise<readonly RoleAssignment[]> {
    const user = await this.userRepository.findById(userId);
    if (user === null) {
      return [];
    }

    return user.roles.map((selection) => ({
      role: selection.role,
      tenantId: user.tenantId,
    }));
  }
}
