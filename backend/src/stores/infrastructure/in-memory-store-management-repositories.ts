import { DomainError } from "../../shared/domain/index.js";
import type {
  Page,
  PageRequest,
  SaveOptions,
} from "../../shared/domain/index.js";
import type {
  Branch,
  BranchRepository,
  StaffInvitation,
  StaffInvitationRepository,
  Store,
  StoreMember,
  StoreMemberRepository,
  StoreRepository,
} from "../domain/store-repository.js";
import { isStoreAvailableForBooking } from "../domain/store-policies.js";

const assertExpectedVersion = <T extends { readonly version: unknown }>(
  current: T | undefined,
  expectedVersion: SaveOptions["expectedVersion"],
  message: string,
  details: Readonly<Record<string, unknown>>,
): void => {
  if (expectedVersion !== undefined && current?.version !== expectedVersion) {
    throw new DomainError("VERSION_CONFLICT", message, details);
  }
};

export class InMemoryStoreRepository implements StoreRepository {
  private readonly stores = new Map<Store["id"], Store>();

  async findById(id: Store["id"]): Promise<Store | null> {
    return this.stores.get(id) ?? null;
  }

  async listVisible(page: PageRequest): Promise<Page<Store>> {
    const items = [...this.stores.values()]
      .filter((store) => isStoreAvailableForBooking(store))
      .slice(0, page.limit);

    return { items };
  }

  async listByOwnerUserId(
    userId: Store["ownerUserId"],
  ): Promise<readonly Store[]> {
    return [...this.stores.values()].filter(
      (store) => store.ownerUserId === userId,
    );
  }

  async save(store: Store, options?: SaveOptions): Promise<Store> {
    assertExpectedVersion(
      this.stores.get(store.id),
      options?.expectedVersion,
      "Store version conflict",
      { storeId: store.id },
    );

    this.stores.set(store.id, store);
    return store;
  }
}

export class InMemoryBranchRepository implements BranchRepository {
  private readonly branches = new Map<Branch["id"], Branch>();

  async findById(id: Branch["id"]): Promise<Branch | null> {
    return this.branches.get(id) ?? null;
  }

  async listByStoreId(storeId: Branch["storeId"]): Promise<readonly Branch[]> {
    return [...this.branches.values()].filter(
      (branch) => branch.storeId === storeId,
    );
  }

  async save(branch: Branch, options?: SaveOptions): Promise<Branch> {
    assertExpectedVersion(
      this.branches.get(branch.id),
      options?.expectedVersion,
      "Branch version conflict",
      { branchId: branch.id },
    );

    this.branches.set(branch.id, branch);
    return branch;
  }
}

export class InMemoryStaffInvitationRepository implements StaffInvitationRepository {
  private readonly invitations = new Map<
    StaffInvitation["id"],
    StaffInvitation
  >();

  async findById(id: StaffInvitation["id"]): Promise<StaffInvitation | null> {
    return this.invitations.get(id) ?? null;
  }

  async listByStoreId(
    storeId: StaffInvitation["storeId"],
  ): Promise<readonly StaffInvitation[]> {
    return [...this.invitations.values()].filter(
      (invitation) => invitation.storeId === storeId,
    );
  }

  async save(
    invitation: StaffInvitation,
    options?: SaveOptions,
  ): Promise<StaffInvitation> {
    assertExpectedVersion(
      this.invitations.get(invitation.id),
      options?.expectedVersion,
      "Staff invitation version conflict",
      { staffInvitationId: invitation.id },
    );

    this.invitations.set(invitation.id, invitation);
    return invitation;
  }
}

export class InMemoryStoreMemberRepository implements StoreMemberRepository {
  private readonly members = new Map<StoreMember["id"], StoreMember>();

  async findById(id: StoreMember["id"]): Promise<StoreMember | null> {
    return this.members.get(id) ?? null;
  }

  async findByStoreAndUser(
    storeId: StoreMember["storeId"],
    userId: StoreMember["userId"],
  ): Promise<StoreMember | null> {
    return (
      [...this.members.values()].find(
        (member) => member.storeId === storeId && member.userId === userId,
      ) ?? null
    );
  }

  async listByStoreId(
    storeId: StoreMember["storeId"],
  ): Promise<readonly StoreMember[]> {
    return [...this.members.values()].filter(
      (member) => member.storeId === storeId,
    );
  }

  async listByUserId(
    userId: StoreMember["userId"],
  ): Promise<readonly StoreMember[]> {
    return [...this.members.values()].filter(
      (member) => member.userId === userId,
    );
  }

  async save(member: StoreMember, options?: SaveOptions): Promise<StoreMember> {
    assertExpectedVersion(
      this.members.get(member.id),
      options?.expectedVersion,
      "Store member version conflict",
      { storeMemberId: member.id },
    );

    this.members.set(member.id, member);
    return member;
  }
}
