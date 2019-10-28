using DatingApp.Model;
using System.Threading.Tasks;

namespace DatingApp.Data
{
    public interface IAuthRepository
    {
        Task<Users> Register(Users user, string password);
        Task<Users> Login(string userName, string password);
        Task<bool> UserExists(string userName);
    }
}