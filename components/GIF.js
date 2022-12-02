import * as React from 'react';
import {
  Text,
  View,
  Image,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import styles from '../config/style';
import { sendRequest, getGIF } from '../api/api';
import prompts from '../config/prompts';

class GIF extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      downloading: false,
      prompt_start: prompts.start,
      prompt_end: prompts.end,
      uri: 'https://replicate.delivery/pbxt/XcIza6ZefTvP7kvtRk0B2LXLKnC7KawQIhaMYdep5hsCmfLAB/video.gif',
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    let response = { id: '' };

    this.setState({
      loading: true,
    });

    sendRequest(this.state.prompt_start, this.state.prompt_end)
      .then((res) => {
        console.log(res);
        response = res;
      })
      .catch((err) => {
        console.log(err);
      });

    const interval = setInterval(() => {
      getGIF(response.id)
        .then((data) => {
          console.log(data);
          // check if animation is ready
          if (data.completed_at != null) {
            this.setState({
              uri: data.output[0],
              loading: false,
              downloading: true,
            });
            clearInterval(interval)
          } else if (data.detail == prompts.error) {
            clearInterval(interval)
            throw prompts.error
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, 5 * 1000);
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : 'height'}
        style={styles.container}
      >
        <ScrollView style={{height:"100%"}}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View> 

              <Image
                style={styles.gif}
                source={{ uri: this.state.uri }}
                onLoadStart={() => this.setState({ downloading: true })}
                onLoadEnd={() => this.setState({ downloading: false })}
              />

              {this.state.downloading ? (
                <ActivityIndicator
                  size="large"
                  style={styles.indicator}
                />
              ) : null
              }
              <Text>Prompt start:</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => this.setState({ prompt_start: text })}
                value={this.state.prompt_start}
                placeholder={this.state.prompt_start}
              />

              <Text>Prompt end:</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => this.setState({ prompt_end: text })}
                value={this.state.prompt_end}
                placeholder={this.state.prompt_end}
              />

              <Pressable
                style={styles.button}
                onPress={this.handleClick}
                disabled={this.state.loading || this.state.downloading}>
                <Text style={styles.button_text}>Get GIF</Text>
              </Pressable>

              <Text style={styles.paragraph}>
                {this.state.loading
                  ? 'Hold tight. It takes about two minutes...'
                  : null}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default GIF;
