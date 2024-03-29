﻿using DatingApp.Helpers;
using DatingApp.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DatingApp.Data
{
    public interface IDatingRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<IEnumerable<Users>> GetUsers();
        Task<PageList<Users>> GetUsers(UserParams userParams);
        Task<Users> GetUser(int id);

        Task<Photo> GetPhoto(int id);

        Task<Photo> GetMainPhotoForUser(int userId);

        Task<Like> GetLike(int userId, int recipientId);

        Task<Message> GetMessage(int id);
        Task<PageList<Message>> GetMessageForUser(MessageParams messageParams);
        Task<IEnumerable<Message>> GetMessageThread(int userId, int recipientId);
    }
}
