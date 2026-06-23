import type { UserId } from "../../shared/domain/index.js";
import type { UserRepository } from "../../identity/domain/identity-repository.js";
import type { RoleAssignment, RoleName } from "../../identity/domain/rbac.js";
import type { RoleAssignmentLookup } from "../../identity/application/security-pipeline.js";
import type { StoreMemberRepository } from "../domain/store-repository.js";

export class StoreManagementRoleAssignmentLookup implements RoleAssignmentLookup {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly storeMemberRepository: StoreMemberRepository,
  ) {}

  async listRoleAssignments(
    userId: UserId,
  ): Promise<readonly RoleAssignment[]> {
    const [user, memberships] = await Promise.all([
      this.userRepository.findById(userId),
      this.storeMemberRepository.listByUserId(userId),
    ]);

    const onboardingAssignments: readonly RoleAssignment[] =
      user?.roles.map((selection) => ({
        role: selection.role,
        tenantId: user.tenantId,
      })) ?? [];

    const membershipAssignments: readonly RoleAssignment[] = memberships
      .filter((member) => member.status === "ACTIVE")
      .map((member) => ({
        role: member.role as RoleName,
        tenantId: member.tenantId,
        storeId: member.storeId,
        branchIds: member.branchIds,
        grantedPermissions: member.grantedPermissions,
        deniedPermissions: member.deniedPermissions,
      }));

    return [...onboardingAssignments, ...membershipAssignments];
  }
}
