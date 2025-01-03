﻿using AgencjaNieruchomosci.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

#nullable disable

namespace AgencjaNieruchomosci.Migrations
{
    [DbContext(typeof(ContextOgloszenia))]
    partial class ContextOgloszeniaModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "9.0.0");

            modelBuilder.Entity("AgencjaNieruchomosci.Models.Ogloszenie", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<float>("Cena")
                        .HasColumnType("REAL");

                    b.Property<string>("Opis")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Tytuł")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Ulica")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string[]>("Zdjecia")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("ID");

                    b.ToTable("Ogloszenia");
                });
#pragma warning restore 612, 618
        }
    }
}
