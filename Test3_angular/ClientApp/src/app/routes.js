"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var home_component_1 = require("./home/home.component");
var messages_component_1 = require("./messages/messages.component");
var lists_component_1 = require("./lists/lists.component");
var auth_guard_1 = require("./_guards/auth.guard");
var member_list_component_1 = require("./members/member-list/member-list.component");
var member_detail_component_1 = require("./members/member-detail/member-detail.component");
var member_detail_resolver_1 = require("./_resolvers/member-detail.resolver");
var members_edit_component_1 = require("./members/members-edit/members-edit.component");
var member_lists_resolver_1 = require("./_resolvers/member-lists.resolver");
var member_edit_resolver_1 = require("./_resolvers/member-edit.resolver");
var prevent_unsaved_changes_guard_1 = require("./_guards/prevent-unsaved-changes.guard");
var lists_resolver_1 = require("./_resolvers/lists.resolver");
exports.appRoutes = [
    { path: '', component: home_component_1.HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [auth_guard_1.AuthGuard],
        children: [
            { path: 'members', component: member_list_component_1.MemberListComponent, resolve: { users: member_lists_resolver_1.MemberListResolver } },
            { path: 'members/:id', component: member_detail_component_1.MemberDetailComponent, resolve: { user: member_detail_resolver_1.MemberDetailResolver } },
            {
                path: 'member/edit', component: members_edit_component_1.MembersEditComponent, resolve: { user: member_edit_resolver_1.MemberEditResolver }, canDeactivate: [prevent_unsaved_changes_guard_1.PreventUnsavedChanges]
            },
            { path: 'messages', component: messages_component_1.MessagesComponent },
            { path: 'lists', component: lists_component_1.ListsComponent, resolve: { users: lists_resolver_1.ListResolver } }
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' } ////wild card. should be at last . Ordering matters for this.
];
//# sourceMappingURL=routes.js.map