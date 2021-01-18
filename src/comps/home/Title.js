import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Title = () => {
  const { currentUser } = useAuth();

  function generateGreeting() {
      const today = new Date();
      const curHr = today.getHours();

      let baseStr = "";
      if (curHr < 12) {
          baseStr = "Good morning, ";
      } else if (curHr < 18) {
          baseStr = "Good afternoon, ";
      } else {
          baseStr = "Good evening, ";
      }

      return baseStr + (currentUser ? currentUser.displayName : "Guest");
  }

  return (
    <div className="title">
      <h2>{generateGreeting()}.</h2>
      <p>Great satisfaction comes from sharing with others.</p>
    </div>
  )
}

export default Title;