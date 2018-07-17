using System.Linq;
using AutoMapper;
using DatingApp.API.Controllers;
using DatingApp.API.Dtos;
using DatingApp.API.Models;

namespace DatingApp.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User,UserForListDto>()
                .ForMember(dest => dest.PhotoUrl, opts => {
                    opts.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                })
                .ForMember(dest => dest.Age, opts => {
                    opts.ResolveUsing(d => d.DateOfBirth.CalculateAge());
                });
            CreateMap<User,UserForDetailedDto>()
                .ForMember(dest => dest.PhotoUrl, opts => {
                    opts.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                })
                .ForMember(dest => dest.Age, opts => {
                    opts.ResolveUsing(d => d.DateOfBirth.CalculateAge());
                });;
            CreateMap<Photo,PhotoForDetailedDto>();

            CreateMap<UserForUpdateDto, User>();
            CreateMap<PhotoForCreationDto, Photo>();
            CreateMap<Photo,PhotoForReturnDto>();
            CreateMap<UserForRegisterDto,User>();
            CreateMap<MessageForCreationDto,Message>().ReverseMap();
            CreateMap<Message,MessageToReturnDto>()
                .ForMember(
                    m => m.SenderPhotoUrl, 
                    opt => opt.MapFrom(u => u.Sender.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(
                    m => m.RecipientPhotoUrl, 
                    opt => opt.MapFrom(u => u.Recipient.Photos.FirstOrDefault(p => p.IsMain).Url));
        }
    }
}
