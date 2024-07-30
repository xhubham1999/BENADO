import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const ProjectsSection = () => {
  
  const [projects, setProjects] = useState([]);
 
  const [projectHeadline, setProjectHeadline] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  useEffect(() => {
    // Fetch projects data from backend
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/projects`);
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects data:", error);
      }
    };

    const fetchBasicSettings = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/basicsetting`);
        setProjectHeadline(response.data.projectHeadline);
        setProjectDescription(response.data.projectDescription);
      } catch (error) {
        console.error("Error fetching basic settings:", error);
      }
    };

    fetchProjects();
    fetchBasicSettings();
  }, []);

 

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="slick-arrow slick-next" onClick={onClick}>
        Next
      </div>
    );
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="slick-arrow slick-prev" onClick={onClick}>
        Previous
      </div>
    );
  };

  // Slick settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 3, // Number of slides to show at a time
    slidesToScroll: 3, // Number of slides to scroll
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div id="projects" className="text-center">
      <div className="container" style={{height:'75rem'}}>
        <div className="section-title" style={{margin:'100px'}}>
          <h2>{projectHeadline}</h2>
          <p>{projectDescription}</p>
        </div>
          <p style={{ margin:"15px", color:'black'}}>Click Project For Demo</p>
        <Slider {...settings}>
          {projects.map((project, i) => (
            <div key={i} className="project-wrapper">
              <a href={`${project.link}`} target="_blank" rel="noopener noreferrer" className="project-link">
                <div className="project-item hover-bg">
                  <img
                    src={`http://localhost:8080/uploads/${project.image}`}
                    alt={project.title}
                    className="img-fluid project-image"
                  />
                  <div className="hover-text">
                    <h4>{project.title}</h4>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProjectsSection;
