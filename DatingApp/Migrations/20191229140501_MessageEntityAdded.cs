﻿using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DatingApp.Migrations
{
    public partial class MessageEntityAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            ////migrationBuilder.CreateTable(
            ////    name: "Users",
            ////    columns: table => new
            ////    {
            ////        Id = table.Column<int>(nullable: false)
            ////            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            ////        UserName = table.Column<string>(nullable: true),
            ////        PasswordHash = table.Column<byte[]>(nullable: true),
            ////        PasswordSalt = table.Column<byte[]>(nullable: true),
            ////        Gender = table.Column<string>(nullable: true),
            ////        DateOfBirth = table.Column<DateTime>(nullable: false),
            ////        KnownAs = table.Column<string>(nullable: true),
            ////        Created = table.Column<DateTime>(nullable: false),
            ////        LastActive = table.Column<DateTime>(nullable: false),
            ////        Introduction = table.Column<string>(nullable: true),
            ////        LookingFor = table.Column<string>(nullable: true),
            ////        Interests = table.Column<string>(nullable: true),
            ////        City = table.Column<string>(nullable: true),
            ////        Country = table.Column<string>(nullable: true)
            ////    },
            ////    constraints: table =>
            ////    {
            ////        table.PrimaryKey("PK_Users", x => x.Id);
            ////    });

            ////migrationBuilder.CreateTable(
            ////    name: "Values",
            ////    columns: table => new
            ////    {
            ////        Id = table.Column<int>(nullable: false)
            ////            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            ////        Name = table.Column<string>(nullable: true)
            ////    },
            ////    constraints: table =>
            ////    {
            ////        table.PrimaryKey("PK_Values", x => x.Id);
            ////    });

            ////migrationBuilder.CreateTable(
            ////    name: "Likes",
            ////    columns: table => new
            ////    {
            ////        LikerId = table.Column<int>(nullable: false),
            ////        LikeeId = table.Column<int>(nullable: false)
            ////    },
            ////    constraints: table =>
            ////    {
            ////        table.PrimaryKey("PK_Likes", x => new { x.LikeeId, x.LikerId });
            ////        table.ForeignKey(
            ////            name: "FK_Likes_Users_LikeeId",
            ////            column: x => x.LikeeId,
            ////            principalTable: "Users",
            ////            principalColumn: "Id",
            ////            onDelete: ReferentialAction.Restrict);
            ////        table.ForeignKey(
            ////            name: "FK_Likes_Users_LikerId",
            ////            column: x => x.LikerId,
            ////            principalTable: "Users",
            ////            principalColumn: "Id",
            ////            onDelete: ReferentialAction.Restrict);
            ////    });

            migrationBuilder.CreateTable(
                name: "Message",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    SenderId = table.Column<int>(nullable: false),
                    RecipientId = table.Column<int>(nullable: false),
                    Content = table.Column<string>(nullable: true),
                    IsRead = table.Column<bool>(nullable: false),
                    DateRead = table.Column<DateTime>(nullable: true),
                    MessageSent = table.Column<DateTime>(nullable: false),
                    SenderDeleted = table.Column<bool>(nullable: false),
                    RecipientDeleted = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Message", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Message_Users_RecipientId",
                        column: x => x.RecipientId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Message_Users_SenderId",
                        column: x => x.SenderId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            ////migrationBuilder.CreateTable(
            ////    name: "Photos",
            ////    columns: table => new
            ////    {
            ////        Id = table.Column<int>(nullable: false)
            ////            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            ////        Url = table.Column<string>(nullable: true),
            ////        Description = table.Column<string>(nullable: true),
            ////        PublicId = table.Column<string>(nullable: true),
            ////        DateAdded = table.Column<DateTime>(nullable: false),
            ////        IsMain = table.Column<bool>(nullable: false),
            ////        UsersId = table.Column<int>(nullable: false)
            ////    },
            ////    constraints: table =>
            ////    {
            ////        table.PrimaryKey("PK_Photos", x => x.Id);
            ////        table.ForeignKey(
            ////            name: "FK_Photos_Users_UsersId",
            ////            column: x => x.UsersId,
            ////            principalTable: "Users",
            ////            principalColumn: "Id",
            ////            onDelete: ReferentialAction.Cascade);
            ////    });

            ////migrationBuilder.CreateIndex(
            ////    name: "IX_Likes_LikerId",
            ////    table: "Likes",
            ////    column: "LikerId");

            migrationBuilder.CreateIndex(
                name: "IX_Message_RecipientId",
                table: "Message",
                column: "RecipientId");

            migrationBuilder.CreateIndex(
                name: "IX_Message_SenderId",
                table: "Message",
                column: "SenderId");

            ////migrationBuilder.CreateIndex(
            ////    name: "IX_Photos_UsersId",
            ////    table: "Photos",
            ////    column: "UsersId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            ////migrationBuilder.DropTable(
            ////    name: "Likes");

            migrationBuilder.DropTable(
                name: "Message");

            ////migrationBuilder.DropTable(
            ////    name: "Photos");

            ////migrationBuilder.DropTable(
            ////    name: "Values");

            ////migrationBuilder.DropTable(
            ////    name: "Users");
        }
    }
}
