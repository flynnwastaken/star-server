import React from 'react'
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom"
import Box from '@mui/material/Box';
import { IconButton, Paper, Tooltip } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ShareButton from "./ShareButton";
import VoterAuth from "./VoterAuth";

const ElectionHome = ({ authSession, electionData, fetchElection }) => {

  return (
    <>
      {electionData && electionData.election && electionData.voterAuth &&
        <Box
          display='flex'
          justifyContent="center"
          alignItems="center"
          sx={{ width: '100%' }}>
          <Paper elevation={3} sx={{ p: 3, width: 600, minHeight:400, 
          display: 'flex',
          flexDirection: 'column', justifyContent: 'space-between' }} >

            {/* <Box sx={{ m: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <ShareButton url={`${window.location.origin}/Election/${electionData.election.election_id}`} text={'Share'} />
            </Box> */}
            <Box sx={{ flexGrow: 0 }}>
              <Typography align='center' gutterBottom variant="h3" component="h3" fontWeight={'bold'}>
                {electionData.election.title}
              </Typography>

            </Box>

            <Box sx={{ flexGrow: 1 }}>
              <Typography align='center' component="p" style={{ whiteSpace: 'pre-line' }}>
                {electionData.election.description}
              </Typography>
            </Box>

            <VoterAuth authSession={authSession} electionData={electionData} fetchElection={fetchElection} />

            {electionData.election.state === 'finalized' && electionData.election.start_time &&
              <Box sx={{ flexGrow: 1 }}>
                <Typography align='center' variant="h6" component="h6">
                  {`Election begins on ${new Date(electionData.election.start_time).toLocaleDateString()} at ${new Date(electionData.election.start_time).toLocaleTimeString()} `}
                </Typography>
              </Box>
            }

            {electionData.election.state === 'open' && <>

              {electionData.election.end_time &&
              
                <Box sx={{ flexGrow: 1 }}>
                  < Typography align='center' variant="h6" component="h6">
                    {`Election ends on ${new Date(electionData.election.end_time).toLocaleDateString()} at ${new Date(electionData.election.end_time).toLocaleTimeString()} `}
                  </Typography>
                </Box>}
              {
                electionData.voterAuth.has_voted == false && electionData.voterAuth.authorized_voter && !electionData.voterAuth.required &&

                <Box sx={{ flexGrow: 1, p: 1 }}>
                  <Button fullWidth variant='outlined' href={`/Election/${String(electionData?.election?.election_id)}/vote`} >
                    <Typography align='center' variant="h3" component="h3" fontWeight='bold' sx={{ p: 2 }}>
                      Vote
                    </Typography>
                  </Button>
                </Box>
              }
            </>}

            {electionData.election.state === 'closed' &&
            
            <Box sx={{ flexGrow: 1 }}>
              <Typography align='center' variant="h6" component="h6">
                {`Election ended on ${new Date(electionData.election.end_time).toLocaleDateString()} at ${new Date(electionData.election.end_time).toLocaleTimeString()} `}
              </Typography>
            </Box>
            }
            {electionData.voterAuth.has_voted == true &&
              <Box sx={{ flexGrow: 1 }}>
                <Typography align='center' variant="h6" component="h6">
                  Ballot Submitted
                </Typography>
              </Box>
            }
            {(electionData.election.state === 'open' || electionData.election.state === 'closed') && electionData.election.settings.public_results === true &&
              <Box sx={{ p: 1, flexGrow: 0 }}>
                <Button fullWidth variant='outlined' href={`/Election/${electionData.election.election_id}/results`} >
                  View Results
                </Button>
              </Box>
            }
            {/* <Box sx={{ p: 1, display: 'flex', justifyContent: 'flex-end' }}>
              {authSession.isLoggedIn() &&
                <Tooltip title="Create copy of this election" >
                  <IconButton component={Link} to={`/DuplicateElection/${electionData.election.election_id}`}>
                    <ContentCopyIcon />
                  </IconButton>
                </Tooltip>
              }
            </Box> */}

          </Paper>
        </Box>
      }
    </>
  )
}

export default ElectionHome
