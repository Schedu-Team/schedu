from app import models


class Storage:
    Users = models.UsersModel()
    Tokens = models.TokensModel()
    Groups = models.GroupsModel()
    Assignments = models.AssignmentsModel()
    Roles = models.RolesModel()
    Permissions = models.PermissionsModel()
    Attachments = models.AttachmentsModel()
    PublicGroups = models.PublicGroupsModel()
    TemporaryRoles = models.TemporaryRolesModel()
    RecurringAssignments = models.RecurringAssignmentsModel()
    DelayedAssignments = models.DelayedAssignmentsModel()

    User_MEMBER_OF_Group = models.User_MEMBER_OF_GroupModel()
    Assignment_CREATED_BY_User = models.Assignment_CREATED_BY_UserModel()
    User_HAS_COMPLETED_Assignment = models.User_HAS_COMPLETED_AssignmentModel()
    Assignment_HAS_Attachment = models.Assignment_HAS_AttachmentModel()
    Assignment_RELATES_TO_Group = models.Assignment_RELATES_TO_GroupModel()
    Role_INCLUDES_Permission = models.Role_INCLUDES_PermissionModel()
    Role_RELATES_TO_Group = models.Role_RELATES_TO_GroupModel()
    User_HAS_Role = models.User_HAS_RoleModel()
