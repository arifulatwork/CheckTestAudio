import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Pressable, Modal } from 'react-native';

import BravoriButton from './BravoriButton';
import ImageNoteThumbnail from './ImageNoteThumbnail';
import ImageViewer from './ImageViewer';

import { MAIN_BLUE } from '@/Colors';
import spacing from '@/commonStyles/Spacing';
import typography from '@/commonStyles/Typography';
import i18n from '@/translations/i18n';
import { Task } from '@/types/Task';
import track from '@/utils/analytics';

type Props = {
  task: Task;
};

const TeacherNotes = ({ task }: Props) => {
  const LINES_TO_RENDER = 3;
  const scrollViewRef = useRef<ScrollView | null>(null);
  const writtenNoteTextRef = useRef<Text | null>(null);
  const [imageViewerVisible, setImageViewerVisible] = useState(false);
  const [startAtIndex, setStartAtIndex] = useState(0);
  const [isTruncated, setIsTruncated] = useState(false);
  const [initialRenderDone, setInitialRenderDone] = useState(false);
  const [showExpandedWrittenNote, setShowExpandedWrittenNote] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      if (scrollViewRef.current) scrollViewRef.current.flashScrollIndicators();
    }, 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    track({ name: 'View Teacher Notes' });
  }, []);

  return (
    <View style={[styles.container, spacing.pt1, { opacity: initialRenderDone ? 1 : 0 }]}>
      <Pressable onPress={() => setShowExpandedWrittenNote(true)} style={[spacing.ph1]}>
        <Text style={[typography.text, typography.bold, typography.left]}>
          {i18n.t('components.teacherNotes.yourTeacherNotes')}:
        </Text>
        <Text
          numberOfLines={isTruncated ? LINES_TO_RENDER : undefined}
          style={[typography.text]}
          onTextLayout={(e) => {
            if (e.nativeEvent.lines.length > LINES_TO_RENDER) {
              setIsTruncated(true);
            }
            setInitialRenderDone(true);
          }}
          ref={(r) => (writtenNoteTextRef.current = r)}>
          {task.writtenNote}
        </Text>
        {isTruncated ? (
          <Text style={[typography.text, typography.bold, { textDecorationLine: 'underline' }]}>
            {i18n.t('components.teacherNotes.viewMore')}
          </Text>
        ) : null}
      </Pressable>
      <ScrollView
        horizontal
        style={{}}
        ref={(r) => {
          scrollViewRef.current = r;
        }}>
        <View style={[styles.images, spacing.mb1]}>
          {task.attachments.map((a, i) => (
            <ImageNoteThumbnail
              style={{ maxWidth: Dimensions.get('screen').width / 4 }}
              key={a.fileLocation}
              onPressAction="preview"
              onPreview={() => {
                setStartAtIndex(i);
                setImageViewerVisible(true);
              }}
              uri={a.fileLocation}
            />
          ))}
        </View>
      </ScrollView>
      <ImageViewer
        imageUris={task.attachments.map((a) => a.fileLocation)}
        onClose={() => setImageViewerVisible(false)}
        visible={imageViewerVisible}
        startAtIndex={startAtIndex}
      />
      <Modal presentationStyle="formSheet" animationType="slide" visible={showExpandedWrittenNote}>
        <View style={[spacing.pa2]}>
          <Text style={typography.h3}>
            {i18n.t('components.teacherNotes.writtenNotesFor', {
              taskTitle: task.title,
            })}
          </Text>
          <Text style={[typography.textBig, spacing.mt1]} selectable>
            {task.writtenNote}
          </Text>
        </View>
        <View style={{ flex: 1 }} />
        <View style={spacing.mb2}>
          <BravoriButton onPress={() => setShowExpandedWrittenNote(false)}>
            {i18n.t('general.Close')}
          </BravoriButton>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: MAIN_BLUE,
    borderWidth: 1,
  },
  images: {
    flexDirection: 'row',
    paddingLeft: 5,
    minWidth: '100%',
    justifyContent: 'center',
  },
});

export default TeacherNotes;
