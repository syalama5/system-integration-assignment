exports.helloWorld = (req, res) => {
  let keyword = req.query.keyword;
  if(keyword){
    res.status(200).send('NEHA says ' +keyword);
  } else {
    res.status(200).send('query parameter not found');
  }
};
