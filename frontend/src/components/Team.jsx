import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Team = () => {
  
  const [teamMembers, setTeamMembers] = useState([]);
  const [teamHeading, setTeamHeading] = useState('Meet the Team');
  const [teamDescription, setTeamDescription] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed dapibus leonec.');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const basicSettingsResponse = await axios.get(`http://localhost:8080/basicsetting`);
        setTeamHeading(basicSettingsResponse.data.teamHeading);
        setTeamDescription(basicSettingsResponse.data.teamDescription);

        const teamResponse = await axios.get(`http://localhost:8080/team`);
        setTeamMembers(teamResponse.data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching team data:', error);
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  return (
    <div id="team" className="text-center">
      <div className="container">
        <div className="col-md-8 col-md-offset-2 section-title">
          <h2>{teamHeading}</h2>
          <p>{teamDescription}</p>
        </div>
        <div className="row">
          {loading ? (
            <p>Loading team members...</p>
          ) : (
            teamMembers.map((member, index) => (
              <div key={index} className="col-md-3 col-sm-6 team">
                <div className="thumbnail">
                  <img src={`http://localhost:8080/uploads/${member.image}`} alt={member.name} className="team-img" />
                  <div className="caption">
                    <h4>{member.name}</h4>
                    <p>{member.post}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
