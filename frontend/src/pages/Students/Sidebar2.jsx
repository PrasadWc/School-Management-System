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
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  BookOpenIcon,
  PresentationChartLineIcon,
  CalendarIcon,
  EnvelopeIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/solid";

const Sidebar = () => {
  return (
    <Card className="fixed top-0 left-0 h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Student Portal
        </Typography>
      </div>
      <List>
        <ListItem>
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          Dashboard
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <BookOpenIcon className="h-5 w-5" />
          </ListItemPrefix>
          Assignments
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <PresentationChartLineIcon className="h-5 w-5" />
          </ListItemPrefix>
          Performance
          <ListItemSuffix>
            <Chip
              value="14"
              size="sm"
              variant="ghost"
              color="blue-gray"
              className="rounded-full"
            />
          </ListItemSuffix>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <CalendarIcon className="h-5 w-5" />
          </ListItemPrefix>
          Attendance
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <EnvelopeIcon className="h-5 w-5" />
          </ListItemPrefix>
          Announcement
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <ArrowLeftStartOnRectangleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
};

export default Sidebar;
