﻿using DatingApp.Model;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;

namespace DatingApp.Data
{
    public class Seed
    {
        public static void SeedUsers(DataContext dataContext)
        {
            if (!dataContext.Users.Any())
            {
                var userData = System.IO.File.ReadAllText("Data/MaleSeedData.json");
                ////C:\Users\sonur\source\repos\DatingApp\DatingApp\Data\UserSeedData.json
                var users = JsonConvert.DeserializeObject<List<Users>>(userData);

                foreach (var user in users)
                {
                    byte[] passwordHash, passwordSalt;
                    CreatePasswordHash("password", out passwordHash, out passwordSalt);

                    user.PasswordHash = passwordHash;
                    user.PasswordSalt = passwordSalt;
                    user.UserName = user.UserName.ToLower();
                    dataContext.Users.Add(user);
                }

                dataContext.SaveChanges();
            }
        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}
