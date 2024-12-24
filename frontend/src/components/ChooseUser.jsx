import * as React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import teacher from "../assets/teacher.jpg";
import students from "../assets/Students.jpg";
import parent from "../assets/parent.jpg";
import adminimage from "../assets/adminimage.jpg";
import { Link } from "react-router-dom";

export function ChooseUser() {
  const cardInfo = [
    {
      title: "Student",
      image: students,
      description: "Access resources and information for students.",
      link: "/StudentSignin",
    },
    {
      title: "Teacher",
      image: teacher,
      description: "Manage your classes and students efficiently.",
      link: "/TeacherSignin",
    },
    {
      title: "Parent",
      image: parent,
      description: "Stay informed about your child’s progress and activities.",
      link: "/ParentSignin",
    },
    {
      title: "Admin",
      image: adminimage,
      description: "Handle administrative tasks and manage school operations.",
      link: "/AdminSignin",
    },
  ];

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "80vh",
    padding: "20px",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: "16px",
    backgroundColor: "grey",
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div style={containerStyle}>
        <Typography
          mb={6}
          sx={{ fontSize: "3.5rem" }}
          variant="h4"
          component="h1"
          gutterBottom
        >
          Sign in as...
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {cardInfo.map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ maxWidth: 450, height: "100%" }}>
                <CardActionArea component={Link} to={card.link}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={card.image}
                    alt={card.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {card.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {card.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default ChooseUser;
