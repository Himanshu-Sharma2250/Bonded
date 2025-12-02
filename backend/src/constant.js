export const UserRolesEnum = {
    ADMIN: "ADMIN",
    USER: "USER"
}

export const availableUserRoles = Object.values(UserRolesEnum);

export const USER_TEMPORARY_TOKEN_EXPIRY = 20 * 60 * 1000;

export const TeamRolesEnum = {
    LEADER: "LEADER",
    MEMBER: "MEMBER"
}

export const availableTeamRoles = Object.values(TeamRolesEnum);

export const TeamMemberAction = {
    JOINED: "JOINED",
    LEFT: "LEFT",
    KICKED_OUT: "KICKED_OUT"
}

export const availableTeamMemberActions = Object.values(TeamMemberAction);