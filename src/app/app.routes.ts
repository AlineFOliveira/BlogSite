import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BlogsComponent } from './entities/blogs/list-blogs/blogs.component';
import { PostsComponent } from './entities/posts/posts.component';
import { UsersComponent } from './adm/users/list-users/users.component';
import { SettingsComponent } from './user/settings/settings.component';
import { ViewBlogsComponent } from './entities/blogs/view-blogs/view-blogs.component';
import { EditBlogsComponent } from './entities/blogs/edit-blogs/edit-blogs.component';
import { AddBlogsComponent } from './entities/blogs/add-blogs/add-blogs.component';
import { ViewUsersComponent } from './adm/users/view-users/view-users.component';
import { AddUsersComponent } from './adm/users/add-users/add-users.component';

export const routes: Routes = [
    {path:"", component: HomeComponent},
    {path:"home", component: HomeComponent},
    {path:"posts", component: PostsComponent},

    {path:"blogs", component: BlogsComponent},
    {path:"blogs/create", component: AddBlogsComponent},
    {path:"blogs/view/:id", component: ViewBlogsComponent},
    {path:"blogs/edit/:id", component: EditBlogsComponent},

    {path:"users", component: UsersComponent},
    {path:"users/create", component: AddUsersComponent},
    {path:"users/view/:login", component: ViewUsersComponent},

    {path:"settings", component: SettingsComponent},

    
    
];
