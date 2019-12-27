using System;
using System.ComponentModel.DataAnnotations;

namespace DatingApp.Dtos
{
    public class UserForRegisterDto
    {
        [Required(AllowEmptyStrings = false, ErrorMessage = "Username is Mandatory")]
        public string Username { get; set; }

        [Required(AllowEmptyStrings =false, ErrorMessage ="Password is Mandatory")]
        [StringLength(8, MinimumLength =4, ErrorMessage ="You must specify the password between 4 and 8")]
        public string Password { get; set; }
        [Required]
        public string Gender { get; set; }
        [Required]
        public string KnownAs { get; set; }
        [Required]
        public DateTime DateOfBirth { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string Country { get; set; }

        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }

        public UserForRegisterDto()
        {
            Created = DateTime.Now;
            LastActive = DateTime.Now;
        }
    }
}
