import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import Parse from '../APIs/Parse';


export default class LinksScreen extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
                Parse:new Parse(),
                isLoading: true,
      }
 }



 componentDidMount() {
  this.state.Parse.create('dev',{'location':'exotic'})


}
  render() {
    return (
      <ScrollView style={styles.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
        <ExpoLinksView />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
