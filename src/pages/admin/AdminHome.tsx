import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutDashboard, Users, HandCoins, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminLayout from "./AdminLayout";

const adminPages = [
  {
    label: "Project Management",
    description: "Create and manage all NGO projects.",
    path: "/admin/projects",
    icon: <LayoutDashboard className="h-8 w-8 text-primary" />
  },
  {
    label: "Donation Management",
    description: "Monitor and manage all donation activities.",
    path: "/admin/donations",
    icon: <HandCoins className="h-8 w-8 text-primary" />
  },
  {
    label: "Subscription Management",
    description: "Monitor and manage all subscriptions.",
    path: "/admin/subscriptions",
    icon: <HandCoins className="h-8 w-8 text-primary" />
  },
  {
    label: "Volunteer Management",
    description: "Monitor and manage all volunteers.",
    path: "/admin/volunteers",
    icon: <HandCoins className="h-8 w-8 text-primary" />
  },
  // {
  //   label: "Team Management",
  //   description: "Manage team members and permissions.",
  //   path: "/admin/team",
  //   icon: <Users className="h-8 w-8 text-primary" />
  // }
];

const AdminHome = () => {
  const navigate = useNavigate();
  // const user = UserStore.useState(s => s.user);
  // console.log(user)
  const user = JSON.parse(localStorage.getItem('userInfo') || '{}')
  // const isLoggedIn = UserStore.useState(s => s.isLoggedIn);
  

  React.useEffect(() => {
    console.log(user)
    if (Object.keys(user).length === 0) {
      navigate("/admin/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    // UserStore.update(s => {
    //   s.user = null;
    //   s.isLoggedIn = false;
    // });
    navigate("/admin/login");
  };

  

  
  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold font-serif">Admin Panel</h1>
          <div className="flex items-center gap-4">
            <span className="font-bold"> Welcome </span>
            <span className="font-bold"> {user?.user?.username || user?.user?.email} </span>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {adminPages.map((page) => (
            <Card
              key={page.path}
              className="cursor-pointer hover:shadow-lg transition-shadow border-primary/30"
              onClick={() => navigate(page.path)}
            >
              <CardHeader className="flex flex-col items-center justify-center">
                {page.icon}
                <CardTitle className="mt-4 text-xl text-center">{page.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">{page.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminHome;