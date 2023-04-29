export const getPartnerInfo = (email, participants) => {
  return participants.find((participant) => participant.email !== email);
};
