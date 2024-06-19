import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BlogsComponent } from './entities/blogs/blogs.component';
import { PostsComponent } from './entities/posts/posts.component';
import { UsersComponent } from './adm/users/users.component';
import { SettingsComponent } from './user/settings/settings.component';
import { ViewBlogsComponent } from './entities/blogs/view-blogs/view-blogs.component';
import { EditBlogsComponent } from './entities/blogs/edit-blogs/edit-blogs.component';
import { AddBlogsComponent } from './entities/blogs/add-blogs/add-blogs/add-blogs.component';

export const routes: Routes = [
    {path:"", component: HomeComponent},
    {path:"home", component: HomeComponent},
    {path:"blogs", component: BlogsComponent},
    {path:"posts", component: PostsComponent},
    {path:"users", component: UsersComponent},
    {path:"settings", component: SettingsComponent},
    {path:"blogs/view/:id", component: ViewBlogsComponent},
    {path:"blogs/edit/:id", component: EditBlogsComponent},
    {path:"blogs/create", component: AddBlogsComponent},
    
];
