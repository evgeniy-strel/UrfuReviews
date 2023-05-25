﻿@ECHO OFF
dotnet ef database drop
dotnet ef migrations remove
dotnet ef migrations add "initial_migrations"
dotnet ef database update