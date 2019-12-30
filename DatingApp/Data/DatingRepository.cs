using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.Helpers;
using DatingApp.Model;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.Data
{
    public class DatingRepository : IDatingRepository
    {
        private readonly DataContext _context;

        public DatingRepository(DataContext context)
        {
            this._context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Like> GetLike(int userId, int recipientId)
        {
            return await _context.Likes.FirstOrDefaultAsync(u => u.LikerId == userId && u.LikeeId == recipientId);
        }

        public async Task<Photo> GetMainPhotoForUser(int userId)
        {
            return await _context.Photos.Where(a => a.UsersId == userId).FirstOrDefaultAsync(p => p.IsMain);
        }

        public async Task<Photo> GetPhoto(int id)
        {
            var photo = await _context.Photos.FirstOrDefaultAsync(a => a.Id == id);

            return photo;
        }

        public Task<Users> GetUser(int id)
        {
            var user = _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(a => a.Id == id);

            return user;
        }

        public async Task<IEnumerable<Users>> GetUsers()
        {
            var users = await _context.Users.Include(p => p.Photos).ToListAsync();

            return users;
        }

        public async Task<PageList<Users>> GetUsers(UserParams userParams)
        {
            var users = _context.Users.Include(p => p.Photos).OrderByDescending(a => a.LastActive).AsQueryable();

            users = users.Where(a => a.Id != userParams.UserId && a.Gender == userParams.Gender);

            if (userParams.MinAge != 18 || userParams.MaxAge != 99)
            {
                var minDob = DateTime.Today.AddYears(-userParams.MaxAge - 1);
                var maxDob = DateTime.Today.AddYears(-userParams.MinAge);

                users = users.Where(a => a.DateOfBirth >= minDob && a.DateOfBirth <= maxDob);
            }

            if (userParams.Likers)
            {
                var userLikers = await GetUserLikes(userParams.UserId, userParams.Likers);
                users = users.Where(u => userLikers.Contains(u.Id));
            }

            if (userParams.Likees)
            {
                var userLikees = await GetUserLikes(userParams.UserId, userParams.Likers);
                users = users.Where(u => userLikees.Contains(u.Id));
            }

            if (!string.IsNullOrWhiteSpace(userParams.OrderBy))
            {
                switch (userParams.OrderBy)
                {
                    case "created":
                        users = users.OrderByDescending(a => a.Created);
                        break;
                    default:
                        users = users.OrderByDescending(a => a.LastActive);
                        break;
                }
            }

            return await PageList<Users>.CreateAsync(users, userParams.PageNumber, userParams.PageSize);
        }

        private async Task<IEnumerable<int>> GetUserLikes(int id, bool likers)
        {
            var user = await _context.Users.Include(a => a.Likees).Include(a => a.Likers).FirstOrDefaultAsync(u => u.Id == id);

            if (likers)
            {
                return user.Likers.Where(u => u.LikeeId == id).Select(i => i.LikerId);
            }
            else
            {
                return user.Likees.Where(u => u.LikerId == id).Select(i => i.LikeeId);
            }
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Message> GetMessage(int id)
        {
            return await _context.Message.FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<PageList<Message>> GetMessageForUser(MessageParams messageParams)
        {
            var messages = _context.Message.Include(a => a.Sender).ThenInclude(a => a.Photos)
                .Include(a => a.Recipient).ThenInclude(a => a.Photos).AsQueryable();

            switch (messageParams.MessageContainer)
            {
                case "Inbox":
                    messages = messages.Where(a => a.RecipientId == messageParams.UserId && a.RecipientDeleted == false);
                    break;
                case "Outbox":
                    messages = messages.Where(a => a.SenderId == messageParams.UserId && a.SenderDeleted == false);
                    break;
                default:
                    messages = messages.Where(a => a.RecipientId == messageParams.UserId && a.IsRead == false && a.RecipientDeleted == false);
                    break;
            }

            messages = messages.OrderByDescending(a => a.MessageSent);

            return await PageList<Message>.CreateAsync(messages, messageParams.PageNumber, messageParams.PageSize);
        }

        public async Task<IEnumerable<Message>> GetMessageThread(int userId, int recipientId)
        {
            var messages = await _context.Message.Include(a => a.Sender).ThenInclude(a => a.Photos)
                                           .Include(a => a.Recipient).ThenInclude(a => a.Photos)
                                           .Where(a => (a.RecipientId == userId && a.RecipientDeleted == false
                                           && a.SenderId == recipientId)
                                                    || (a.RecipientId == recipientId && a.SenderId == userId 
                                                    && a.SenderDeleted == false))
                                           .OrderByDescending(a => a.MessageSent)
                                           .ToListAsync();

            return messages;
        }
    }
}
