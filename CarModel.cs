//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace RazCarProjectServer.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class CarModel
    {
        public int ModelID { get; set; }
        public string Manufactor { get; set; }
        public string ModelName { get; set; }
        public int PricePerDay { get; set; }
        public int PriceForLateDay { get; set; }
        public int Year { get; set; }
        public string Gear { get; set; }
        public string Photo { get; set; }
    }
}