using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Project1.Auth
{
    public class AuthOptions
    {
        public const string ISSUER = "UrfuReviewISSUER"; // издатель токена //TODO: перенести в setting-файл
        public const string AUDIENCE = "UrfuReviewAUDIENCE"; // потребитель токена //TODO: перенести в setting-файл
        const string KEY = "UrfuReviewAUDIENCEUrfuReviewISSUER228key";   // ключ для шифрации //TODO: перенести в setting-файл
        public const int LIFETIME = 1 * 60 * 24 * 7; // время жизни токена - 1 минута //TODO: перенести в setting-файл
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}
