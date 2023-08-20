import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    padding: 24,
    height: "100%",
    backgroundColor: 'blue',
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    textAlign: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    margin: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  button_text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  gif: {
    height: 300,
    width: 300,
    marginBottom: 15,
    alignSelf: 'center',
  },
  indicator: { 
    position: 'absolute', 
    alignSelf: 'center', 
    height: 300,
    width:300,
    backgroundColor:'white'
  },
  input: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
  },
});