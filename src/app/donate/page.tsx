'use client';

import { motion } from 'framer-motion';
import { FaHandHoldingHeart, FaQrcode, FaUniversity, FaCopy, FaBook, FaChalkboardTeacher, FaLaptop, FaUtensils } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function Donate() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast.success(message);
  };

  const bankDetails = {
    accountName: 'WE CAN ',
    accountNumber: '41211010000795',
    ifscCode: 'CNRB0004121',
    bankName: 'Canara Bank',
    branch: 'NIT Agartala Campus',
  };

  const donationOptions = [
    {
      amount: 500,
      title: 'Education Kit',
      description: 'Provide books, stationery, and learning materials for one child.',
      icon: <FaBook className="text-3xl text-primary" />,
    },
    {
      amount: 1500,
      title: 'Sponsor a Student',
      description: "Support a child's education for one month with tuition and learning resources.",
      icon: <FaChalkboardTeacher className="text-3xl text-primary" />,
    },
    {
      amount: 2500,
      title: 'Digital Learning',
      description: 'Contribute towards computers and digital learning tools for our centers.',
      icon: <FaLaptop className="text-3xl text-primary" />,
    },
    {
      amount: 10000,
      title: 'Ananya Techno-Cultural-Sports fest',
      description: 'Support our annual sports and cultural fest for children.',
      icon: <FaUtensils className="text-3xl text-primary" />,
    },
  ];
  

  const [openStory, setOpenStory] = useState<string | null>(null);

  const impactStories = [
    {
      name: 'Naman Rai',
      title: 'Our Little Hero – Naman Rai',
      summary: `Naman Rai is a regular student at WeCan — bright, sincere, and especially brilliant in Mathematics. For his age, he speaks with such clarity and conviction that it leaves everyone amazed.....`,
      full: `Naman Rai is a regular student at WeCan — bright, sincere, and especially brilliant in Mathematics. For his age, he speaks with such clarity and conviction that it leaves everyone amazed. He carries himself like a young political leader, with natural leadership qualities that draw people to him. His intelligence is impressive, but it's his presence and maturity that leave a lasting impact.\n\nHowever, there's one particular incident that moved all of us deeply — something none of us will ever forget.\n\nIt was the day of Holi celebrations at WeCan. All the volunteers had gathered early, with colours and sweets. We were excitedly waiting for the kids to arrive so we could begin the celebrations. When the children walked into the room, Naman was among them, as always. But something felt different. Though he wore a smile, it wasn't quite the same. His eyes looked tired and swollen, dark circles surrounding them. Concerned, we quietly asked one of the older kids — a close friend of Naman — if something had happened. He hesitated for a moment and then said, "Naman's mother passed away last night. He cried all night."\n\nWe stood there in silence, stunned. A few of us had tears welling up in our eyes. It was hard to comprehend. Yet, there he was — smiling gently, just a little less brightly than usual. And to our utter disbelief, he was the first to pick up colours and start the Holi celebration. While we were still processing the loss, Naman had already decided to lead. The kids followed his lead, and the room slowly filled with laughter and colours.\n\nBut my heart and mind were elsewhere. I stood in the middle of the room, frozen, surrounded by the happy chaos, with a hundred questions racing through my mind. "Why did he even come today? How is he smiling through such grief? How strong can a child be?"\n\nI couldn't stop thinking about his mother. I still remember how she used to come to WeCan often, asking about Naman's progress. She was deeply involved — always making sure he came regularly, attending every parent meeting, encouraging his studies and growth. She believed in him. And suddenly, in that moment, all my questions were answered. Naman came to WeCan not in spite of his grief, but because of it. He came to honour his mother — to live the life she dreamed for him. Instead of mourning in silence, he chose to show strength, to carry forward her wishes. That realization moved me to tears.\n\nSince that day, whenever I see Naman, I don't feel pity or sadness. I feel pride — a deep, unwavering pride. He's not just a little boy anymore. He has grown up a lot — far beyond his years. He is, and always will be, our hero.`,
      image: '/images/naman.jpeg'
    },
    {
      name: 'Muskan Aktar',
      title: 'Muskan Aktar – Dreaming Big',
      summary: `My name is Muskan Aktar, and I am in the 3rd grade at T.E. College High School. I dream of becoming a doctor when I grow up because I want to help people feel better...`,
      full: `My name is Muskan Aktar, and I am in the 3rd grade at T.E. College High School. I dream of becoming a doctor when I grow up because I want to help people feel better. Today, someone suggested to my mother that I should join WeCan to study, but she replied, "use abhi khelne do; jab voh badee ho jayegi, to voh vaise bhee shaadi kar legi" But I believe I can be more than that. I want to study hard and show my parents that even a simple girl from a small town like Agartala can do something amazing. I hope one day they will see that I can make a difference.`,
      image: '/images/muskan.jpeg'
    },
    {
      name: 'Mahi',
      title: 'Mahi – The Game Changer',
      summary: `I'm Mahi, a student at WeCan — but I'm a little different from other students. People often think I'm a boy when they see me, but I am a girl, a tomboy, to be exact...`,
      full: `I'm Mahi  a student at WeCan — but I'm a little different from other students. People often think I'm a boy when they see me, but I am a girl, a tomboy, to be exact. I'm almost always surrounded by boys. Studying during the WeCan sessions is tough for me — I just can't sit still for long. But Saturday? That's my day — Game Day. And on Game Day, I'm the main character. Badminton, cricket, carrom — any game you name, I'm there. And honestly? Some boys even admit that I play better than them.\n\nOne day, a didi asked me, "Mahi, bade hoke kya ~karoge~ karogi?" I replied, "Kya karungi, bat, ball khelungi." She laughed — but I was serious. The volunteers at WeCan help me a lot. Sometimes, they even trick me into studying by calling it a game — and somehow, it works! These games will always be a part of my life. And the moments I spend at WeCan? They make me feel like I'm the star of my own story. Because here, I can grow, learn, and play — just by being myself.`,
      image: '/images/mahi.jpeg'
    }
  ];

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-primary text-white">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Support Our Cause</h1>
            <div className="w-20 h-1 bg-secondary mx-auto mb-8"></div>
            <p className="max-w-3xl mx-auto text-lg text-white/90">
              Your contribution can help us provide quality education to more underprivileged children and make a lasting impact on their lives.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Donation Options */}
      <section className="section bg-background">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">How Your Donation Helps</h2>
            <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-lg">
              Every contribution, no matter how small, makes a significant difference in the lives of the children we serve.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {donationOptions.map((option, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-custom text-center"
              >
                <div className="mb-4 flex justify-center">{option.icon}</div>
                <h3 className="text-xl font-bold mb-2">₹{option.amount}</h3>
                <h4 className="text-lg font-medium text-primary mb-3">{option.title}</h4>
                <p className="text-gray-600 mb-4">{option.description}</p>
                <button className="btn btn-outline w-full">Donate</button>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 text-center"
          >
            <p className="text-lg mb-4">
              Want to donate a different amount or make a recurring donation?
            </p>
            <button className="btn btn-primary">Custom Donation</button>
          </motion.div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Payment Methods</h2>
            <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-lg">
              Choose the payment method that's most convenient for you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* QR Code Section */}
            <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-lg shadow-custom"
          >
            <div className="flex items-center mb-6">
              <FaQrcode className="text-3xl text-primary mr-4" />
              <h3 className="text-2xl font-bold">Scan & Pay</h3>
            </div>
            <div className="flex justify-center mb-6">
              <div className="h-64 w-64 rounded-lg overflow-hidden">
              <img 
                src="/images/WeCanQR.jpeg" 
                alt="WeCan donation QR code" 
                className="h-full w-full object-cover"
              />
              </div>
            </div>
            <p className="text-center text-gray-600 mb-4">
              Scan the QR code with any UPI app to donate directly to WeCan.
            </p>
            <div className="text-center">
              <button className="btn btn-primary">Download QR Code</button>
            </div>
          </motion.div>

            {/* Bank Details Section */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-background p-8 rounded-lg shadow-custom"
            >
              <div className="flex items-center mb-6">
                <FaUniversity className="text-3xl text-primary mr-4" />
                <h3 className="text-2xl font-bold">Bank Transfer</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white rounded-md">
                  <div>
                    <p className="text-sm text-gray-500">Account Name</p>
                    <p className="font-medium">{bankDetails.accountName}</p>
                  </div>
                  <button 
                    className="text-primary hover:text-primary/80"
                    onClick={() => copyToClipboard(bankDetails.accountName, 'Account name copied!')}
                    aria-label="Copy account name"
                  >
                    <FaCopy />
                  </button>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-white rounded-md">
                  <div>
                    <p className="text-sm text-gray-500">Account Number</p>
                    <p className="font-medium">{bankDetails.accountNumber}</p>
                  </div>
                  <button 
                    className="text-primary hover:text-primary/80"
                    onClick={() => copyToClipboard(bankDetails.accountNumber, 'Account number copied!')}
                    aria-label="Copy account number"
                  >
                    <FaCopy />
                  </button>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-white rounded-md">
                  <div>
                    <p className="text-sm text-gray-500">IFSC Code</p>
                    <p className="font-medium">{bankDetails.ifscCode}</p>
                  </div>
                  <button 
                    className="text-primary hover:text-primary/80"
                    onClick={() => copyToClipboard(bankDetails.ifscCode, 'IFSC code copied!')}
                    aria-label="Copy IFSC code"
                  >
                    <FaCopy />
                  </button>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-white rounded-md">
                  <div>
                    <p className="text-sm text-gray-500">Bank Name</p>
                    <p className="font-medium">{bankDetails.bankName}</p>
                  </div>
                  <button 
                    className="text-primary hover:text-primary/80"
                    onClick={() => copyToClipboard(bankDetails.bankName, 'Bank name copied!')}
                    aria-label="Copy bank name"
                  >
                    <FaCopy />
                  </button>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-white rounded-md">
                  <div>
                    <p className="text-sm text-gray-500">Branch</p>
                    <p className="font-medium">{bankDetails.branch}</p>
                  </div>
                  <button 
                    className="text-primary hover:text-primary/80"
                    onClick={() => copyToClipboard(bankDetails.branch, 'Branch name copied!')}
                    aria-label="Copy branch name"
                  >
                    <FaCopy />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tax Benefits */}
      {/* <section className="section bg-background">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="bg-primary text-white p-8 md:p-12 rounded-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Tax Benefits</h2>
                <p className="mb-6">
                  All donations to WeCan are eligible for tax deduction under Section 80G of the Income Tax Act. You will receive a donation receipt that can be used for tax purposes.
                </p>
                <button className="btn bg-white text-primary hover:bg-white/90">
                  Learn More
                </button>
              </div>
              <div className="hidden md:block">
                <div className="h-64 bg-primary-dark rounded-lg flex items-center justify-center">
                  <p className="text-white/70">Tax Benefits Image</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section> */}

      {/* Impact Stories */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Your Impact</h2>
            <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-lg">
              See how your donations are making a difference in the lives of children.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impactStories.map((story, idx) => (
              <motion.div
                key={story.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-background rounded-lg overflow-hidden"
              >
                <div className="h-48 bg-gray-300 flex items-center justify-center">
                  <img 
                    src={story.image} 
                    alt={story.title} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{story.title}</h3>
                  <p className="text-gray-600 mb-4">
                    {openStory === story.name ? story.full.split('\n').map((line, i) => <span key={i}>{line}<br/></span>) : story.summary}
                  </p>
                  <button
                    className="text-primary font-medium hover:text-primary/80"
                    onClick={() => setOpenStory(openStory === story.name ? null : story.name)}
                  >
                    {openStory === story.name ? 'Show Less' : 'Read More'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-background">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center mb-6">
              <FaHandHoldingHeart className="text-4xl text-secondary mr-3" />
              <h2 className="text-3xl font-bold">Make a Difference Today</h2>
            </div>
            <p className="max-w-2xl mx-auto mb-8 text-lg">
              Every contribution, no matter how small, helps us in our mission to empower underprivileged children through education. Your support can change lives.
            </p>
            <button className="btn btn-primary text-lg px-8 py-3">
              Donate Now
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
} 