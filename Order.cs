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
    
    public partial class Order
    {
        public int OrderID { get; set; }
        public int UserID { get; set; }
        public System.DateTime StartDate { get; set; }
        public System.DateTime ReturnDate { get; set; }
        public System.DateTime ActualReturnDate { get; set; }
        public int PlateNumber { get; set; }
        public string Manufactor { get; set; }
        public string ModelName { get; set; }
    }
}