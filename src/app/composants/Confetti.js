'use client'
import React, { useEffect, useRef, useState } from 'react';

function startConfettiAnimation(canvasRef) {
    var W = window.innerWidth;
    var H = window.innerHeight;
    var canvas = canvasRef.current;
    var context = canvas.getContext('2d');
    var maxConfettis = 150;
    var particles = [];
    var possibleColors = [
        "DodgerBlue",
        "OliveDrab",
        "Gold",
        "Pink",
        "SlateBlue",
        "LightBlue",
        "Gold",
        "Violet",
        "PaleGreen",
        "SteelBlue",
        "SandyBrown",
        "Chocolate",
        "Crimson"
      ];
      
      function randomFromTo(from, to) {
        return Math.floor(Math.random() * (to - from + 1) + from);
      }
      
      function confettiParticle() {
        this.x = Math.random() * W;
        this.y = Math.random() * H - H;
        this.r = randomFromTo(11, 33);
        this.d = Math.random() * maxConfettis + 11;
        this.color =
          possibleColors[Math.floor(Math.random() * possibleColors.length)];
        this.tilt = Math.floor(Math.random() * 33) - 11;
        this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
        this.tiltAngle = 0;
      
        this.draw = function() {
          context.beginPath();
          context.lineWidth = this.r / 2;
          context.strokeStyle = this.color;
          context.moveTo(this.x + this.tilt + this.r / 3, this.y);
          context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
          return context.stroke();
        };
      }
      
      function Draw() {
        const results = [];
      
        
        requestAnimationFrame(Draw);
      
        context.clearRect(0, 0, W, window.innerHeight);
      
        for (var i = 0; i < maxConfettis; i++) {
          results.push(particles[i].draw());
        }
      
        let particle = {};
        let remainingFlakes = 0;
        for (var i = 0; i < maxConfettis; i++) {
          particle = particles[i];
      
          particle.tiltAngle += particle.tiltAngleIncremental;
          particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
          particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;
      
          if (particle.y <= H) remainingFlakes++;
      
          if (particle.x > W + 30 || particle.x < -30 || particle.y > H) {
            particle.x = Math.random() * W;
            particle.y = -30;
            particle.tilt = Math.floor(Math.random() * 10) - 20;
          }
        }
      
        return results;
      }
      
      window.addEventListener(
        "resize",
        function() {
          W = window.innerWidth;
          H = window.innerHeight;
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        },
        false
      );
      
      for (var i = 0; i < maxConfettis; i++) {
        particles.push(new confettiParticle());
      }
      
      canvas.width = W;
      canvas.height = H;
      Draw();

  }
  function Confetti() {
    const canvasRef = useRef(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (isVisible) {
          startConfettiAnimation(canvasRef);
          setTimeout(() => {
            setIsVisible(false);
          }, 10000); 
        }
      }, [isVisible]);
  
    return (
      <canvas
      id="canvas"
      ref={canvasRef}
      style={{
        overflowY: 'hidden',
        overflowX: 'hidden',
        width: '100%',
        margin: 0,
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1,
        display: isVisible ? 'block' : 'none'
      }}
      />
    );
  }
  
  export default Confetti;