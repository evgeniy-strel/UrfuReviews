using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Project1.Models
{
    public class Person
    {
        [Key]
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
    }
    //public enum Role
    //{
    //    User,
    //    Admin
    //}
}
