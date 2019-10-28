using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.Dtos
{
    public class UserForRegisterDto
    {
        [Required(AllowEmptyStrings = false, ErrorMessage = "Username is Mandatory")]
        public string Username { get; set; }

        [Required(AllowEmptyStrings =false, ErrorMessage ="Password is Mandatory")]
        [StringLength(8, MinimumLength =4, ErrorMessage ="You must specify the password between 4 and 8")]
        public string Password { get; set; }
    }
}
