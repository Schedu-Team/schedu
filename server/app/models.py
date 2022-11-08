import datetime
from typing import Any
from dateutil import parser as dateutil_parser

from app.models_base import Field, EntityModel


def datetime_parser(x: Any) -> datetime.datetime:
    if isinstance(x, int):
        return datetime.datetime.fromtimestamp(x)
    else:
        return dateutil_parser.parse(str(x))


class UsersModel(EntityModel):
    def __init__(self):
        super().__init__(table_name="Users",
                         fields=[
                             Field("user_id", int, required=False, db_auto=True),
                             Field("username", str),
                             Field("password_hash", str),
                             Field("first_name", str),
                             Field("last_name", str),
                             Field("graduation_year", int, required=False),
                             Field("email", str, required=False),
                         ])


class TokensModel(EntityModel):
    def __init__(self):
        super().__init__(table_name="Tokens",
                         fields=[
                             Field("token_id", int, required=False, db_auto=True),
                             Field("expires_in", datetime_parser),
                             Field("user_id", int, foreign_key=(UsersModel, "user_id")),
                         ])


class GroupsModel(EntityModel):
    def __init__(self):
        super().__init__(table_name="Groups",
                         fields=[
                             Field("group_id", int, required=False, db_auto=True),
                             Field("name", str),
                             Field("description", str)
                         ])


class AssignmentsModel(EntityModel):
    def __init__(self):
        super().__init__(table_name="Assignments",
                         fields=[
                             Field("assignment_id", int, required=False, db_auto=True),
                             Field("deadline", datetime_parser),
                             Field("text", str)
                         ])


class RolesModel(EntityModel):
    def __init__(self):
        super().__init__(table_name="Roles",
                         fields=[
                             Field("role_id", int, required=False, db_auto=True),
                             Field("name", str),
                             Field("description", str)
                         ])


class PermissionsModel(EntityModel):
    def __init__(self):
        super().__init__(table_name="Permissions",
                         fields=[
                             Field("permission_id", int, required=False, db_auto=True),
                             Field("name", str),
                             Field("description", str),
                             Field("type", int)
                         ])


class AttachmentsModel(EntityModel):
    def __init__(self):
        super().__init__(table_name="Attachments",
                         fields=[
                             Field("attachment_id", int, required=False, db_auto=True),
                             Field("file_path", str),
                             Field("file_type", str)
                         ])


class PublicGroupsModel(EntityModel):
    def __init__(self):
        super().__init__(table_name="PublicGroups",
                         fields=[
                             Field("group_id", int, foreign_key=GroupsModel),
                             Field("default_role_id", int, foreign_key=(RolesModel, "role_id"))
                         ])


class TemporaryRolesModel(EntityModel):
    def __init__(self):
        super().__init__(table_name="TemporaryRoles",
                         fields=[
                             Field("role_id", int, foreign_key=RolesModel),
                             Field("expiry_date", datetime_parser)
                         ])


class RecurringAssignmentsModel(EntityModel):
    def __init__(self):
        super().__init__(table_name="RecurringAssignments",
                         fields=[
                             Field("assignment_id", int, foreign_key=AssignmentsModel),
                             Field("interval", int)
                         ])


# class RecurringAssignmentsIgnoredDaysModel(EntityModel):
#     pass


class DelayedAssignmentsModel(EntityModel):
    def __init__(self):
        super().__init__(table_name="DelayedAssignments",
                         fields=[
                             Field("assignment_id", int, foreign_key=AssignmentsModel),
                             Field("publication_date", datetime_parser)
                         ])


class User_MEMBER_OF_GroupModel(EntityModel):
    def __init__(self):
        super().__init__(table_name="User_MEMBER_OF_Group",
                         fields=[
                             Field("user_id", int, foreign_key=UsersModel),
                             Field("group_id", int, foreign_key=GroupsModel)
                         ])


class Assignment_CREATED_BY_UserModel(EntityModel):
    def __init__(self):
        super().__init__(table_name="Assignment_CREATED_BY_User",
                         fields=[
                             Field("user_id", int, foreign_key=UsersModel),
                             Field("assignment_id", int, foreign_key=AssignmentsModel),
                             Field("timestamp", datetime_parser)
                         ])


class User_HAS_COMPLETED_AssignmentModel(EntityModel):
    def __init__(self):
        super().__init__(table_name="User_HAS_COMPLETED_Assignment",
                         fields=[
                             Field("user_id", int, foreign_key=UsersModel),
                             Field("assignment_id", int, foreign_key=AssignmentsModel),
                             Field("timestamp", datetime_parser)
                         ])


class Assignment_HAS_AttachmentModel(EntityModel):
    def __init__(self):
        super().__init__(table_name="Assignment_HAS_Attachment",
                         fields=[
                             Field("attachment_id", int, foreign_key=AttachmentsModel),
                             Field("assignment_id", int, foreign_key=AssignmentsModel)
                         ])


class Assignment_RELATES_TO_GroupModel(EntityModel):
    def __init__(self):
        super().__init__(table_name="Assignment_RELATES_TO_Group",
                         fields=[
                             Field("group_id", int, foreign_key=GroupsModel),
                             Field("assignment_id", int, foreign_key=AssignmentsModel)
                         ])


class Role_INCLUDES_PermissionModel(EntityModel):
    def __init__(self):
        super().__init__(table_name="Role_INCLUDES_Permission",
                         fields=[
                             Field("role_id", int, foreign_key=RolesModel),
                             Field("permission_id", int, foreign_key=PermissionsModel)
                         ])


class Role_RELATES_TO_GroupModel(EntityModel):
    def __init__(self):
        super().__init__(table_name="Role_RELATES_TO_Group",
                         fields=[
                             Field("role_id", int, foreign_key=RolesModel),
                             Field("group_id", int, foreign_key=GroupsModel)
                         ])


class User_HAS_RoleModel(EntityModel):
    def __init__(self):
        super().__init__(table_name="User_HAS_Role",
                         fields=[
                             Field("role_id", int, foreign_key=RolesModel),
                             Field("user_id", int, foreign_key=UsersModel)
                         ])
