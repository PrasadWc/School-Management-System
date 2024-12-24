import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import {
  PresentationChartBarIcon,
  Cog6ToothIcon,
  BookOpenIcon,
  PresentationChartLineIcon,
  CalendarIcon,
  EnvelopeIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/solid";

const Sidebar = () => {
  return (
    <Card
      color="light-blue"
      variant="gradient"
      className="fixed top-0 left-0 h-[calc(100vh-0.1rem)] w-full max-w-[18rem] p-4 shadow-xl shadow-blue-gray-900/5 bg-gradient-to-b from-blue-100 to-white"
    >
      <div className="mb-2 p-4">
        <Typography variant="h3" color="blue" textGradient>
          Student Portal
        </Typography>
      </div>
      <div className="flex flex-col h-full">
        <List className="flex-grow">
          <Typography variant="h6">
            <ListItem>
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Link to="/student/dashboard" className="w-full">
                Dashboard
              </Link>
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <BookOpenIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Link to="/student/assignments" className="w-full">
                Assignments
              </Link>
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <PresentationChartLineIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Link to="/student/performance" className="w-full">
                Performance
              </Link>
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <CalendarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Link to="/student/attendance" className="w-full">
                Attendance
              </Link>
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <EnvelopeIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Link to="/student/announcements" className="w-full">
                Announcement
              </Link>
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <Cog6ToothIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Link to="/student/settings" className="w-full">
                Settings
              </Link>
            </ListItem>
          </Typography>
        </List>
        <Typography color="gray">
          <ListItem>
            <ListItemPrefix>
              <ArrowLeftStartOnRectangleIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Link to="/" className="w-full">
              Log Out
            </Link>
          </ListItem>
        </Typography>
      </div>
    </Card>
  );
};

export default Sidebar;
