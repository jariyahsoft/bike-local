import { DomainError } from "../../shared/domain/index.js";
import type {
  Page,
  PageRequest,
  SaveOptions,
} from "../../shared/domain/index.js";
import type {
  AuthIdentity,
  AuthIdentityLookup,
  AuthIdentityRepository,
  ConsentRecord,
  ConsentRecordRepository,
  User,
  UserRepository,
  UserStatus,
} from "../domain/identity-repository.js";

export class InMemoryUserRepository implements UserRepository {
  private readonly users = new Map<User["id"], User>();

  async findById(id: User["id"]): Promise<User | null> {
    return this.users.get(id) ?? null;
  }

  async findByStatus(
    status: UserStatus,
    page: PageRequest,
  ): Promise<Page<User>> {
    const items = [...this.users.values()]
      .filter((user) => user.status === status)
      .slice(0, page.limit);

    return { items };
  }

  async save(user: User, options?: SaveOptions): Promise<User> {
    const current = this.users.get(user.id);
    if (
      options?.expectedVersion !== undefined &&
      current?.version !== options.expectedVersion
    ) {
      throw new DomainError("VERSION_CONFLICT", "User version conflict", {
        userId: user.id,
      });
    }

    this.users.set(user.id, user);
    return user;
  }
}

export class InMemoryAuthIdentityRepository implements AuthIdentityRepository {
  private readonly identities = new Map<AuthIdentity["id"], AuthIdentity>();

  async findById(id: AuthIdentity["id"]): Promise<AuthIdentity | null> {
    return this.identities.get(id) ?? null;
  }

  async findByFirebaseUid(firebaseUid: string): Promise<AuthIdentity | null> {
    return (
      [...this.identities.values()].find(
        (identity) => identity.firebaseUid === firebaseUid,
      ) ?? null
    );
  }

  async findByProviderSubject(
    lookup: AuthIdentityLookup,
  ): Promise<AuthIdentity | null> {
    return (
      [...this.identities.values()].find(
        (identity) =>
          identity.provider === lookup.provider &&
          identity.providerSubject === lookup.providerSubject,
      ) ?? null
    );
  }

  async listByUserId(
    userId: AuthIdentity["userId"],
  ): Promise<readonly AuthIdentity[]> {
    return [...this.identities.values()].filter(
      (identity) => identity.userId === userId,
    );
  }

  async save(
    identity: AuthIdentity,
    options?: SaveOptions,
  ): Promise<AuthIdentity> {
    const current = this.identities.get(identity.id);
    if (
      options?.expectedVersion !== undefined &&
      current?.version !== options.expectedVersion
    ) {
      throw new DomainError(
        "VERSION_CONFLICT",
        "Auth identity version conflict",
        {
          authIdentityId: identity.id,
        },
      );
    }

    this.identities.set(identity.id, identity);
    return identity;
  }
}

export class InMemoryConsentRecordRepository implements ConsentRecordRepository {
  private readonly consents = new Map<ConsentRecord["id"], ConsentRecord>();

  async findById(id: ConsentRecord["id"]): Promise<ConsentRecord | null> {
    return this.consents.get(id) ?? null;
  }

  async listByUserId(
    userId: ConsentRecord["userId"],
  ): Promise<readonly ConsentRecord[]> {
    return [...this.consents.values()].filter(
      (consent) => consent.userId === userId,
    );
  }

  async save(
    consent: ConsentRecord,
    options?: SaveOptions,
  ): Promise<ConsentRecord> {
    const current = this.consents.get(consent.id);
    if (
      options?.expectedVersion !== undefined &&
      current?.version !== options.expectedVersion
    ) {
      throw new DomainError("VERSION_CONFLICT", "Consent version conflict", {
        consentRecordId: consent.id,
      });
    }

    this.consents.set(consent.id, consent);
    return consent;
  }
}
